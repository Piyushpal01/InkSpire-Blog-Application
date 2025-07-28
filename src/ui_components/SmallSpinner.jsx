import { ClipLoader } from "react-spinners"

const override = {
    display: "block",
    borderColor: "White",
};

const SmallSpinner = () => {
  return (
    <ClipLoader
        cssOverride={override}
        size={30}
        aria-label="Loading spinner"
        data-testid="loader"
    />
  )
}

export default SmallSpinner