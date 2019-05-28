import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AddNewEntryMain } from '../containers/add-new-entry/add-new-entry-main';
import MonthlyChart from '../containers/charts/monthly-chart';
import YearlyChart from '../containers/charts/yearly-chart';
import { IndividualDetails } from '../containers/details/individual-details';
import MonthlyDetails from '../containers/details/monthly-details';
import YearlyDetails from '../containers/details/yearly-details';

export class Routes extends React.Component {
    public render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/charts" />} />

                    <Route exact path="/charts" render={() => <Redirect to="/charts/monthly" />} />
                    <Route path={'/charts/monthly'} component={MonthlyChart} />
                    <Route path={'/charts/yearly'} component={YearlyChart} />

                    <Route exact path="/tables" render={() => <Redirect to="/tables/monthly" />} />
                    <Route path={'/tables/yearly'} component={YearlyDetails} />
                    <Route path={'/tables/monthly'} component={MonthlyDetails} />
                    <Route path={'/tables/details'} component={IndividualDetails} />

                    <Route path="/new-entry" component={AddNewEntryMain} />
                </Switch>
            </div>
        );
    }
}
