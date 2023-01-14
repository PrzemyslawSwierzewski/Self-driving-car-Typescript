import { getObstacleEvents } from "./computer-vision";

interface AutonomusCar {
  isRunning?: boolean;
  respond: (events: Events) => void;
}

interface AutonomusCarProps {
  isRunning: boolean;
  steeringControl: Steering;
}

interface Events {
  [i: string]: boolean;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class Car implements AutonomusCar {
  isRunning;
  steeringControl;
  constructor(props: AutonomusCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      return console.log("car is off");
    }
      Object.keys(events).forEach(eventKey => {
        if(!events[eventKey]){
          return;
        }
        if(eventKey === 'ObstacleLeft'){
          this.steeringControl.turn('right');
        } 
        if(eventKey === 'ObstacleRight'){
          this.steeringControl.turn('left');
        }
      })
    }
  }


class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }

  turn(direction: string) {
    this.execute(`Executing: turn ${direction}`);
  }
}

const steering = new SteeringControl();
steering.turn('left');

const autonomusCar = new Car({ isRunning: true, steeringControl: steering });

autonomusCar.respond(getObstacleEvents());
