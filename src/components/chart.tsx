import * as React from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { withLoadingIndicator } from "../higher-order-components/loading-hoc";

export const Charts = (props: any) => {
    return (
        <ResponsiveContainer aspect={3} width="100%" minWidth={800}>
            <ComposedChart data={props.data} margin={{ top: 50, right: 50, left: 50, bottom: 50 }}>
                <XAxis
                    dataKey="date"
                    stroke="#fff"
                    label={{
                        value: props.XAxisLabel,
                        position: "insideBottom",
                        offset: 0,
                        fill: "#fff",
                    }}
                />
                <YAxis
                    stroke="#fff"
                    label={{
                        value: props.YAxisLabel,
                        position: "insideLeft",
                        offset: 0,
                        angle: -90,
                        fill: "#fff",
                    }}
                />
                <Tooltip />
                <Legend wrapperStyle={{ color: "#f5f5f5" }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#fff" strokeOpacity={0.5} vertical={false} />
                <Bar dataKey="debt" fill="#ff0000" barSize={20} />
                <Bar dataKey="asset" fill="#82ca9d" barSize={10} />
                <Line type="monotone" dataKey="total" name="Net Worth" stroke="#8884d8" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export const ChartsWithLoadingIndicator = withLoadingIndicator(Charts);
