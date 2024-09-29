// import { Alert } from "react-bootstrap"

// const message = (varient, children) => {
//   return (
//     <Alert varient={varient}>
//         {children}
//     </Alert>
//   )
// }

// message.defaultProps = {
//   varient: 'info',
// }

// export default message;

import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
