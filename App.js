import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor,
  Alert
} from 'react-native'
import update from 'immutability-helper'
import {LineChart} from 'react-native-charts-wrapper'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            legend: {
                enabled: false
            },
            marker: {
                enabled: true,
                digits: 2,
                backgroundTint: processColor('blue'),
                markerColor: processColor('#44234557'),
                textColor: processColor('white'),
            },
            xAxis: {
                granularityEnabled: true,
                granularity: 1,
                drawLabels: true,
                position: "BOTTOM",
                drawAxisLine: true,
                drawGridLines: false,
                fontFamily: "HelveticaNeue-Medium",
                fontWeight: "bold",
                textSize: 12,
                textColor: processColor("blue"),
                avoidFirstLastClipping: true
            },
            yAxis: {
                left: {
                    drawGridLines: true,
                    gridDashedLine: {
                        lineLength: 10,
                        spaceLength: 10
                    },
                    gridColor: processColor("red")
                },
                right: {
                    enabled: false
                }
            }
        };
    }
    componentDidMount() {
        this.setState(
          update(this.state, {
            data: {
              $set: {
                dataSets: [{
                  values: [{x: 4, y: 0}, {x: 5, y: 0.88}, {x: 6, y: 0.77}, {x: 7, y: 105}], label: 'A',config: { fillColor: processColor('red'),drawFilled: true,fillAlpha: 60,drawValues: false, color: processColor('blue'), mode: "CUBIC_BEZIER"}
                }, {
                  values: [{x: 4, y: 105}, {x: 5, y: 90}, {x: 6, y: 130}, {x: 7, y: 100}], label: 'B',config: { fillColor: processColor('green'),drawFilled: true,fillAlpha: 60,drawValues: false, color: processColor('red'), mode: "CUBIC_BEZIER"}
                }, {
                  values: [{x: 4, y: 110}, {x: 5, y: 110}, {x: 6, y: 105}, {x: 7, y: 115}], label: 'C',config: { fillColor: processColor('blue'),drawFilled: true,fillAlpha: 60,drawValues: false, color: processColor('yellow'), mode: "CUBIC_BEZIER"}
                }],
              }
            }
          })
        );
    }

    onPressLearnMore() {
        Alert.alert('12312')
        this.chart.setDataAndLockIndex({
            dataSets: [{
                values: [
                    {x: 1, y: 0.88},
                    {x: 2, y: 0.77},
                    {x: 3, y: 105},
                    {x: 4, y: 135},
                    {x: 5, y: 0.88},
                    {x: 6, y: 0.77},
                    {x: 7, y: 105},
                    {x: 8, y: 135}
                ],
                label: 'A',
            }, {
                values: [
                    {x: 1, y: 90},
                    {x: 2, y: 130},
                    {x: 3, y: 100},
                    {x: 4, y: 105},
                    {x: 5, y: 90},
                    {x: 6, y: 130},
                    {x: 7, y: 100},
                    {x: 8, y: 105}
                ],
                label: 'B',
            }, {
                values: [
                    {x: 1, y: 110},
                    {x: 2, y: 105},
                    {x: 3, y: 115},
                    {x: 4, y: 110},
                    {x: 5, y: 110},
                    {x: 6, y: 105},
                    {x: 7, y: 115},
                    {x: 8, y: 110}
                ],
                label: 'C',
            }],
        })
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
        console.log(event.nativeEvent)
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <Button onPress={this.onPressLearnMore.bind(this)} title="Press to load more"/>
                <View style={{height: 80}}>
                    <Text> selected entry</Text>
                    <Text> {this.state.selectedEntry}</Text>
                </View>
                <View style={styles.container}>
                    <LineChart
                        style={styles.chart}
                        data={this.state.data}
                        chartDescription={{text: ''}}
                        legend={this.state.legend}
                        marker={this.state.marker}
                        xAxis={this.state.xAxis}    
                        yAxis={this.state.yAxis}          
                        borderColor={processColor('teal')}
                        borderWidth={0}
                        drawBorders={false}
                        autoScaleMinMaxEnabled={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={true}
                        scaleXEnabled={true}
                        scaleYEnabled={false}
                        pinchZoom={false}
                        doubleTapToZoomEnabled={false}
                        highlightPerTapEnabled={true}
                        highlightPerDragEnabled={false}
                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}
                        ref={(lc) => { this.chart = lc }}
                        keepPositionOnRotation={true}
                        animation={{durationY: 1500, easingY: "EaseInOutQuart"}}
                        onSelect={this.handleSelect.bind(this)}
                        drawGridBackground={true}
                        gridBackgroundColor={processColor('white')}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    height: 300
  }
});

export default App;