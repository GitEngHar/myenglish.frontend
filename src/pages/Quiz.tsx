import React, { useState, useEffect } from 'react';
import QuizEditTable from '../components/QuizEditTable';
import { useNavigate } from 'react-router-dom';
import {QuestionTitle} from "../types/QuestionTitle";
import {questionTitleGet, questionTitleSave, questionTitleUpdate} from "../features/myenglish/MyEnglishAPI";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
	GridSlotProps,
} from '@mui/x-data-grid';
import {randomId} from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";

/**
 * x-data-gridのToolbarProps機能をカスタマイズする
 * setRows: oldRowsと古い行データを取得し newRows 新しいデータを返す(GridRowsProp)
 * setRowModesModel: テーブルの動作モードを管理する。編集モードとか。
 * */
declare module '@mui/x-data-grid' {
	interface ToolbarPropsOverrides {
		setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
		setRowModesModel: (
			newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
		) => void;
	}
}


/**
 * レコード追加テキストリンク
 * */
function EditToolbar(props: GridSlotProps['toolbar']) {
	// 編集状態を保持しておく?
	const { setRows, setRowModesModel } = props;

	// 空の新しいデータを追加してテーブルの状態を編集モードにする
	const handleClick = () => {
		const id = randomId();
		// 古い行データを空にする。isNewをtrueへ
		setRows((oldRows) => [
			...oldRows,
			{ id , questionTitleId: 0, ownerUserId: '', questionTitle: '', isNew: true },
		]);
		// テーブルのモードを編集モードにする
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}));
	};

	// レコード追加要素
	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

const mySaveOnServerFunction  = (updatedRow:QuestionTitle) => {
	console.log(updatedRow);
	return true;
}

const Quiz: React.FC = () =>{
	/** 編集状態 と 編集内容を保持する*/
	const [questionTitles,setQuestionTitles] = useState<QuestionTitle[]>([]);
	//const [rows, setRows] = React.useState([]); // APIから取得したデータを格納する
	const [rows, setRows] = React.useState<GridRowsProp>([]); // APIから取得したデータを格納する

	// 行の状態を管理する。初期値を空としている
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

	// 行データの編集を中止した時の挙動??
	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	// 行データの編集モード。特定の行の状態のみ変更している。
	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	// 行データを保存した時の挙動。Viewモードにしている。
	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	// 行データを削除した時の挙動。対象idのデータを弾いている。
	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
	};

	// 行データ編集時キャンセルをクリックした時の挙動。
	// ignoreModificationsは変更したデータを破棄するカスタムオプション
	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);

		// 編集している行が新規追加でない場合は行を復元してる??
		if (editedRow!.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	// 行データのupdate処理。該当idのupdate処理がデータ追加であるかを返している
	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		/**
		 * map処理で1行ずつみている
		 * id該当する行 : updateRow
		 * id該当しない行 : row
		 * */
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		const sendRow: QuestionTitle = {
			questionTitleId : newRow.questionTitleId,
			ownerUserId : newRow.ownerUserId,
			questionTitle : newRow.questionTitle
		}

		/**
		 * Why: 新規データ追加の場合 title で検索するが 編集後のtitleはDBに登録されていないため
		 * What: 行データで編集対象データが存在した場合は既存の問題タイトルIDに置き換える
		 * */
		rows.forEach(row => {
			if (row.id === newRow.id && newRow.isNew === false){
				// TODO: 文字列を綺麗に結合する
				sendRow.questionTitle = sendRow.questionTitle + "," +row.questionTitle;
			}
		});

		newRow.isNew === true ? restQuestionTitleAdd(sendRow) : restQuestionTitleUpdate(sendRow)
		console.log(newRow);

		return updatedRow;
	};

	// モードのチェンジ?
	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{ field: 'questionTitle', headerName: '問題タイトル', width: 150 , editable:true},
		// 編集.削除のアクション
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			// 該当する行のmodeに応じて返す要素を変える
			getActions: ({ id }) => {
				// 編集モードであるかどうか
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				// 編集モード : 保存とキャンセルのアイコン及びハンドル関数を返す
				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: 'primary.main',
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}
				// 編集モード以外 : 編集と削除のアイコン及びハンドル関数を返す
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];



	/**
 	* 初回画面ロード時にタイトルデータを取得してRowデータへセットする
 	* 画面遷移時にパラメータとして渡すため titleオブジェクトへ値を格納する
 	* */
	useEffect(() => {
		const questionTitleGetHandler  = async() => {
			const response = await questionTitleGet();
			setQuestionTitles(response);
			console.log(questionTitles);
			/**
			 * questionTitlesをquestionTitleとしてrowオブジェクト作成の際の値とする
			 * row.xxx: questionTitlte.xxx
			 * */
			const formattedRows = response.map((questionTitle: QuestionTitle) => ({
				id: randomId(),
				questionTitleId: questionTitle.questionTitleId,
				ownerUserId: questionTitle.ownerUserId,
				questionTitle: questionTitle.questionTitle,
				isNew: false,
			}));
			setRows(formattedRows);
		}
		questionTitleGetHandler();
	},[])

	/** RESTAPI 問題のタイトルを更新 */
	const restQuestionTitleUpdate = async (updatedQuestionTitle : QuestionTitle) => {
		const response = await questionTitleUpdate(updatedQuestionTitle);
		console.log(response);
		//alert('Data Update successfully!');
	}

	/** RESTAPI 問題のタイトルを追加 */
	const restQuestionTitleAdd = async (newQuestionTitle : QuestionTitle) => {
		const response = await questionTitleSave(newQuestionTitle);
		console.log(response);
		//alert('Data Update successfully!');
	}

	const navigate = useNavigate();
	const goToQuizForm = () => {
		navigate('/quiz/form');
	}


	// メイン関数の返却要素値
	return (
		// テーブル表示BOX
		<Box
			sx={{
				height: 500,
				width: '100%',
				'& .actions': {
					color: 'text.secondary',
				},
				'& .textPrimary': {
					color: 'text.primary',
				},
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{ toolbar: EditToolbar }}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
			/>
		</Box>)
}

export default Quiz;