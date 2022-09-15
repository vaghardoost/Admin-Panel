import { Component, ReactNode } from "react";
import { FlexboxGrid } from "rsuite";
import DashCard from "./dash.card";
import DashTimeline from "./timeline";

export default class Dashboard extends Component{
    public render(): ReactNode {
        return (
            <FlexboxGrid>
                <DashCard/>
                <DashTimeline/>
            </FlexboxGrid>
        );
    }
}