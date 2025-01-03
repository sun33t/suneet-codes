type EmailTemplateProps = {
  firstname: string;
  lastname: string;
  company?: string;
  email: string;
  message: string;
};
export const EmailTemplate = (props: EmailTemplateProps) => {
  return (
    <div>
      <p>{`Enquiry from ${props.firstname} ${props.lastname}`}</p>
      <p>{`Email: ${props.email}`}</p>
      <p>{`Company: ${props.company}`}</p>
      <p>{`Message:`}</p>
      <p>{props.message}</p>
    </div>
  );
};
