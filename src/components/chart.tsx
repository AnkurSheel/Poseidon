import * as React from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { withLoadingIndicator } from "../higher-order-components/loading-hoc";

export const Charts = (props: any) => {
    return (
        <ResponsiveContainer aspect={3} width="100%" minWidth={800}>
            <ComposedChart data={props.data} margin={{ top: 50, right: 50, left: 50, bottom: 50 }}>
                <XAxis
                    dataKey="date"
                    label={{
                        value: props.XAxisLabel,
                        position: "insideBottom",
                        offset: 0,
                    }}
                />
                <YAxis
                    label={{
                        value: props.YAxisLabel,
                        position: "insideLeft",
                        offset: 0,
                        angle: -90,
                    }}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeOpacity={0.1} vertical={false} />
                <Bar dataKey="debt" fill="#ff0000" barSize={20} />
                <Bar dataKey="asset" fill="#82ca9d" barSize={10} />
                <Line type="monotone" dataKey="total" name="Net Worth" stroke="#8884d8" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export const ChartsWithLoadingIndicator = withLoadingIndicator(Charts);
