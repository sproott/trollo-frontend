import React from "react"
import TextInput from "./TextInput"
import EditableInput, { EditableInputProps } from "./EditableInput"

function EditableText(props: Omit<EditableInputProps, "children">) {
  return (
    <EditableInput {...props}>
      {({ useFormMethods, reopened }) => (
        <TextInput
          name="text"
          useFormMethods={useFormMethods}
          rules={{ required: { value: true, message: "Cannot be blank" } }}
          maxLength={props.maxLength}
          error={!reopened && (useFormMethods.errors.text?.message ?? props.error)}
        />
      )}
    </EditableInput>
  )
}

export default EditableText
