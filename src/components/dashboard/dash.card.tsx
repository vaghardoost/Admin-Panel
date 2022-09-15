import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { Card, State } from "./reducer";

interface Props {
    author:Card,
    users:Card,
    notes:Card,
    category:Card
}

class DashCard extends Component<Props>{
    public render(): ReactNode {
        return (
            <>
                <FlexboxGridItem colspan={6}>
                    <div className="around">
                        <CardItem title={this.props.author.title} subtitle={this.props.author.subtitle} value={this.props.author.value}/>
                    </div>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6}>
                    <div className="around">
                        <CardItem title={this.props.category.title} subtitle={this.props.category.subtitle} value={this.props.category.value}/>
                    </div>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6}>
                    <div className="around">
                        <CardItem title={this.props.notes.title} subtitle={this.props.notes.subtitle} value={this.props.notes.value}/>
                    </div>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6}>
                    <div className="around">
                        <CardItem title={this.props.users.title} subtitle={this.props.users.subtitle} value={this.props.users.value}/>
                    </div>
                </FlexboxGridItem>      
            </>
        )
    }

    
}

function CardItem(params:Card) {
    return (
        <div className="dash-card center bg-middle">
            <h4>{params.title}</h4>
            <p>{params.subtitle}</p>
            <h3>{params.value}</h3>
        </div>
    )
}

function mapStateToProps(reducer:any):Props{
    const state:State = reducer.dashboardReducer;
    return {
        author:state.card.author,
        users:state.card.users,
        notes:state.card.notes,
        category:state.card.category
    }
}

export default connect(mapStateToProps)(DashCard)
