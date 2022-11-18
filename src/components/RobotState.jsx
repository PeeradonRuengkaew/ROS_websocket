import React, { Component } from "react";
import {Row, Col, Container} from "react-bootstrap";
import Config from "../scripts/config";

class RobotState extends Component{
    state = {
        ros: null,
        linear_velocity: 0,
        angular_velocity: 0,
    };

    constructor(){
        super();
        this.init_connection();
    }


    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection",()=>{
            console.log("connection established in Teleoperation Component!");
            console.log(this.state.ros);
            this.setState({connected:true});
        });
        this.state.ros.on("close",() =>{
            console.log("connection is closed! ");
            this.setState({connected: false});

            setTimeout(()=>{
                try{
                    this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT+"");
                
                } catch(error){
                    console.log("connection problem");
                }


            }, Config.RECONNETION_TIMER);


        });

        try{
            this.state.ros.connect("ws://" + 
            Config.ROSBRIDGE_SERVER_IP +
            ":" +
            Config.ROSBRIDGE_SERVER_PORT+
            "");
        
        } catch(error){
            console.log("ws://" +
            Config.ROSBRIDGE_SERVER_IP +
            ":" +
            Config.ROSBRIDGE_SERVER_PORT+
            "")
            console.log("connection problem");
        }
    }


    componentDidMount(){
        this.getRobotState();
    }

    getRobotState(){
     
        var velocity_sub = new window.ROSLIB.Topic({
            ros: this.state.ros, 
            name: "/odom",
            messageType: "nav_msgs/msg/Odometry",
        });

        velocity_sub.subscribe((message) => {
            this.setState({linear_velocity: message.twist.twist.linear.x.toFixed(2)});
            this.setState({angular_velocity: message.twist.twist.angular.z.toFixed(2)});
         });

    }


    

    

    render(){
        return(
            <div>
                <Row>
                    <Col>
                    <h4 className="mt-4">Velocities</h4>
                    <p className="mt-0">Linear Velocity: {this.state.linear_velocity}</p>
                    <p className="mt-0">Angular Velocity: {this.state.angular_velocity}</p>
                    

                    </Col>
                </Row>

            </div>
       
        );
    }
}
export default RobotState;