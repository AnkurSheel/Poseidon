import * as React from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { withLoading } from "./loading-hoc";

export const Charts = (props: any) => {
    return (
        <ComposedChart width={750} height={450} data={props.data} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
            <XAxis
                dataKey="name"
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
    );
};

export const ChartsWithLoading = withLoading(Charts);
