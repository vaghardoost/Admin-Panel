import { Component, ReactNode } from "react";
import { Timeline } from "rsuite";
import { connect } from "react-redux";
import { Report, State } from "./reducer";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

interface Props {
    reports:Report[]
}

class DashTimeline extends Component<Props>{
    public render(): ReactNode {
        return (
            <FlexboxGridItem colspan={12}>
                <Timeline>
                    <div className="around">
                        {this.asTimelineItem()}
                    </div>
                </Timeline>
            </FlexboxGridItem>
        );
    }
    
    private asTimelineItem():ReactNode{
        const result = [];
        for (const report of this.props.reports) {
            result.push(
                <Timeline.Item>
                    <h4>{report.title}</h4>
                    <h6>{report.description}</h6>
                    <p style={{fontSize:'small'}}>{report.dateTime}</p>
                </Timeline.Item>
            )
        }
        return result;
    }
}

function mapStateToProps(reducer:any):Props{
    const state:State = reducer.dashboardReducer;
    return {
        reports:state.reports
    }
}

export default connect(mapStateToProps)(DashTimeline);