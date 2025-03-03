import { FormEvent } from "react";
import { useNavigate } from "react-router";
import Button from "../button/Button";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={(e: FormEvent) => {
        e.preventDefault();
        navigate(-1);
      }}
      type={"back"}
    >
      &larr; Back
    </Button>
  );
}
