const useFormLayout = (label: number = 6) => {
  const total = 24;
  const offset = 1;

  const wrapperSpan = label ? total - label - offset * 4 : total - offset * 2;

  return {
    labelCol: { span: label },
    wrapperCol: { span: wrapperSpan, offset },
  };
};

export default useFormLayout;
