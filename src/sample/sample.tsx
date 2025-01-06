import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

/**
 * rows の初期値を設定する
 * age 以外の要素をランダムで生成する
 * */
const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
];

/**
 * declare : アンビエント宣言。実装定義しないことを宣言する
 * @mui/x-data-grid の型定義を拡張している
 * 行データや行モードの状態を管理できるプロパティを追加するためのもの
 *
 * カスタムツールバーからrowsやrowModesModelを直接操作。
 * 柔軟に行データを追加・削除・編集モードに切り替え可能
 * */
declare module '@mui/x-data-grid' {
    // ToolbarPropsの機能拡張
    interface ToolbarPropsOverrides {
        // oldRowsと古い行データを取得し newRows 新しいデータを返す(GridRowsProp)
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        // テーブルの動作モードを管理する。編集モードとか。
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
            { id, name: '', age: '', role: '', isNew: true },
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


/**
 * メイン動作関数
 * */
export default function FullFeaturedCrudGrid() {
    // 行データ。初期値をinitialRowsにしている
    const [rows, setRows] = React.useState(initialRows);
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
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    // モードのチェンジ?
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // テーブル定義
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        //数値データ
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        //日付カレンダーデータ
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
            editable: true,
        },
        //選択式のセレクトデータ
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },
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
        </Box>
    );
}