import { useEffect, useState } from "react";

const useInputFocus = () => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (inputId) => setFocusedInput(inputId);
  const handleBlur = () => setFocusedInput(null);

  useEffect(() => {
    const handleFocusIn = (event) => {
      const input = event.target;
      if (input && (input.tagName === "INPUT" || input.tagName === "TEXTAREA")) {
        handleFocus(input.id);
      }
    };

    const handleFocusOut = () => handleBlur();

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return { focusedInput };
};

export default useInputFocus;


// import { useState, useEffect, useRef } from "react";

// const useInputFocus = () => {
//   // const [isInputFocused, setInputFocused] = useState(false);
//   // const inputFieldRef = useRef(null);

//   // useEffect(() => {
//   //   const inputField = inputFieldRef.current;

//   //   const handleFocus = () => setInputFocused(true);
//   //   const handleBlur = () => setInputFocused(false);

//   //   inputField.addEventListener("focus", handleFocus);
//   //   inputField.addEventListener("blur", handleBlur);

//   //   return () => {
//   //     inputField.removeEventListener("focus", handleFocus);
//   //     inputField.removeEventListener("blur", handleBlur);
//   //   };
//   // }, []);

//   // return { inputFieldRef, isInputFocused };


//   // const useInputFocus = () => {
//     const [focusedInput, setFocusedInput] = useState(null);

//     const handleFocus = (inputId) => setFocusedInput(inputId);
//     const handleBlur = () => setFocusedInput(null);

//     return { focusedInput, handleFocus, handleBlur };
//   // };
// };

// export default useInputFocus;
