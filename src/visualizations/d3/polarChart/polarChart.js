import React, { Component } from 'react';
import * as d3 from "d3";
import d3Tip from "d3-tip";
import './polarChart.scss';


class PolarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            width: 0,
            height: 0
        }

        this.chartRef = React.createRef();
        this.drawChart = this.drawChart.bind(this, this.props.id);
    }

    getWidth() {
        return this.chartRef.current.parentElement.offsetWidth;
    }

    getHeight() {
        return this.chartRef.current.parentElement.offsetHeight;
    }

    drawChart(chartID) {
        let margin = { top: 5, right: 5, bottom: 5, left: 5 },
            width = this.state.width - margin.left - margin.right,
            height = this.state.height - margin.top - margin.bottom,
            color = '#D8DDEF',
            hoverColor = '#F2AE17',
            axisLineColor = '#4D5058',
            negativeColor = '#F97068';


        // http://stackoverflow.com/a/929107
        var reMap = function (oldValue) {
            var oldMin = 0,
                oldMax = -359,
                newMin = 0,
                newMax = (Math.PI * 2),
                newValue = (((oldValue - 90 - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
            return newValue;

        }

        // Create ToolTip
        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) {
                return "<strong>Tooltip Example:</strong> <span style='color: " + hoverColor + "'>" + d.size + "</span>";
            })    

        let chartRadius = Math.min(width, height) / 2 - 30;

        let r = d3.scaleLinear()
            .domain([0, 1]).nice()
            .range([0, chartRadius]);

        let svg = d3.select('#' + chartID)
            .append('svg')
                .attr('width', width)
                .attr('height', height)
            .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        
        svg.call(tip);

        let gr = svg.append('g')
                .attr('class', 'r axis')
            .selectAll('g')
                .data(r.ticks(5))
                .enter().append('g');

        gr.append('circle')
            .attr('r', r);
        
        gr.append("text")
            .attr("y", function(d) { return -r(d) - 4; })
            .style("text-anchor", "middle")
            .text(function(d) { 
                return d; 
            })
            .attr('fill', axisLineColor);

        let line = d3.lineRadial()
            .radius(function (d) {
                return r(d.radialCoord);
            })
            .angle(function (d) {
                return -reMap(d.angularCoord) + Math.PI / 2;
            });


        svg.selectAll('point')
            .data(this.state.data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('transform', function (d) {
                let coords = line([d]).slice(1).slice(0, -1);
                return 'translate(' + coords + ')'
            })
            .attr('r', function (d) {
                return d.size;
            })
            .attr('fill', d => (d.status === 'On Time' ? color : negativeColor))
            .on("mouseover", function(d) {
                d3.select(this).style("fill", function() {
                    return d3.rgb(d3.select(this).style("fill")).darker(1);
                })
                tip.show(d, this);
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", function() {
                    return d3.rgb(d3.select(this).style("fill")).brighter(1);
                })
                tip.hide(d, this);
            });
    }


    componentDidMount() {
        this.setState({
            data: Object.assign(
                this.state.data
            )
        });
        let width = this.getWidth()
        let height = this.getHeight();
        this.setState({ width: width, height: height }, () => {
            this.drawChart(this.props.id);
        });
        let resizedFn;
        window.addEventListener("resize", () => {
            clearTimeout(resizedFn);
            resizedFn = setTimeout(() => {
                this.redrawChart(this.props.id);
            }, 200)
        });
    }
    redrawChart(chartID) {
        let width = this.getWidth()
        this.setState({ width: width });
        d3.select("#" + chartID + " svg").remove();
        this.drawChart = this.drawChart.bind(this, chartID);
        this.drawChart(chartID);
    }

    render() {
        return <div className="polarChart" id={this.props.id} ref={this.chartRef}></div>
    }

}

export default PolarChart;