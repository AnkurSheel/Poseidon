import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddNewEntryMain from '../../05-pages/add-new-entry-main';
import { IndividualDetails } from '../../05-pages/individual-details';
import MonthlyChart from '../../05-pages/monthly-chart';
import MonthlyDetails from '../../05-pages/monthly-details';
import YearlyChart from '../../05-pages/yearly-chart';
import YearlyDetails from '../../05-pages/yearly-details';

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
