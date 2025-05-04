import { coinstore } from "./Player.js";
import { timer } from "./Player.js";
const ScoreElement=document.querySelector(".Scorewin");
const TimeElement = document.querySelector(".Timewin");
TimeElement.innerHTML=`Time: ${timer}`;
ScoreElement.innerHTML=`Score: ${coinstore}`;
