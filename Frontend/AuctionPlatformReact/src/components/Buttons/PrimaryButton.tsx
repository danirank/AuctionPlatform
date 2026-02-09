import { Button } from "react-bootstrap";

interface ButtonProps {
  buttonText: string;
  buttonEvent?: () => void;
}

function PrimaryButton({ buttonText, buttonEvent}: ButtonProps) {
  return (
    <Button
      onClick={buttonEvent}
      variant="primary">
      {buttonText}
    </Button>
  );
}

export default PrimaryButton;
