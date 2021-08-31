import { useEffect } from "react";

interface LoadingFallbackProps {
  color?: "black" | "red";
}

const LoadingFallback = ({ color = "black" }: LoadingFallbackProps) => {
  useEffect(() => {
    console.log("ZAMONTOWANY LOADING INDICATOR");
  }, []);
  return (
    <div
      style={{
        minHeight: `100vh`,
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ fontSize: 50, color: "white" }}>LOADING PAGE!</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
