import { Link } from "react-router-dom";
import Illustrations from "../assets/images/illustrations.png";

export default function GetStarted() {
  return (
    <div className="GetStarted h-screen flex flex-col items-center justify-between gap-4 p-8 lg:p-12 max-w-lg mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 p-8 lg:p-12 max-w-lg">
        <span className="text-5xl font-bold">todo</span>

        <div className="my-6 text-center">
          Officia id magna officia non occaecat sint culpa. Voluptate et esse
          nostrud adipisicing ipsum laborum tempor reprehenderit aute
          exercitation et exercitation.
        </div>

        <Link to="/todo/all">
          <button className="bg-[#69665C] text-white rounded-lg p-4 w-[150px]">
            Get Started
          </button>
        </Link>
      </div>

      <img src={Illustrations} alt="Illustrations" width="100%" height="auto" />
    </div>
  );
}
