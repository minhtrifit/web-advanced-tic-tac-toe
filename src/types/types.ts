import { Dispatch, SetStateAction } from "react";

export interface History {
  id: string;
  value: string;
}

export interface SquarePropType {
  id: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleSetHistory: (arg0: string, arg1: string) => void;
  winner: string;
  setNextPlayer: Dispatch<SetStateAction<string>>;
}
