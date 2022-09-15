import {Component, ReactNode} from "react"
import { connect } from "react-redux"
import { Table } from "rsuite"
class NoteTable extends Component {
    public render(): ReactNode {
        return (
            <Table rtl>
                <Table.Column>
                    <Table.HeaderCell>ردیف</Table.HeaderCell>
                    <Table.Cell dataKey="index"/>
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>شناسه</Table.HeaderCell>
                    <Table.Cell dataKey="id"/>
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>عنوان</Table.HeaderCell>
                    <Table.Cell dataKey="title"/>
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>دسته بندی</Table.HeaderCell>
                    <Table.Cell dataKey="category"/>
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>کلمات کلیدی</Table.HeaderCell>
                    <Table.Cell dataKey="tag"/>
                </Table.Column>
            </Table>
        )
    }
}

export default connect()(NoteTable);
