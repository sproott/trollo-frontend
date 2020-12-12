import React from "react"
import EditableInput, { EditableInputProps } from "./EditableInput"
import TextArea from "./TextArea"

function EditableTextArea(props: Omit<EditableInputProps, "children">) {
  return (
    <EditableInput {...props}>
      {({ useFormMethods, reopened, onSubmit }) => (
        <TextArea
          name="text"
          useFormMethods={useFormMethods}
          rules={{ required: { value: true, message: "Cannot be blank" } }}
          maxLength={props.maxLength}
          error={!reopened && (useFormMethods.errors.text?.message ?? props.error)}
          optional={props.optional}
          onPressEnter={useFormMethods.handleSubmit(onSubmit)}
          style={{ flexGrow: 1 }}
        />
      )}
    </EditableInput>
  )
}

export default EditableTextArea
