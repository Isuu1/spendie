// "use client";

// import moment from "moment";
// import React, { useState } from "react";
// import styles from "./Select.module.scss";

// interface SelectProps {
//   selectRange: (range: string) => void;
// }

// const Select: React.FC = ({ selectRange }) => {
//   const [showOptions, setShowOptions] = useState(false);

//   const [selectedOption, setSelectedOption] = useState("end of the month");

//   const [openDatePrompt, setOpenDatePrompt] = useState(false);
//   return (
//     <div className={styles.select}>
//       {openDatePrompt && (
//         <div>
//           <input type="date" />
//         </div>
//       )}
//       <p onClick={() => setShowOptions(!showOptions)}>{selectedOption}</p>
//       {showOptions && (
//         <div>
//           <p onClick={() => selectRange("end of the month")}>
//             End of the month
//           </p>
//           <p onClick={() => selectRange("by date")}>Specific date</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Select;
