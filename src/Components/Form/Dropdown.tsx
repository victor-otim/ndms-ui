import { Select } from "@headlessui/react"
import type { ChangeEvent } from "react"

type DropdownOption = Record<string, string>

interface DropdownProps {
  placeholder?: string
  options: DropdownOption[]
  valueKey?: string
  textKey?: string
  name?: string
  id?: string
  selectedValue?: string
  onChangeEventHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function Dropdown ({
  placeholder,
  options,
  valueKey = "value",
  textKey = "text",
  name,
  id,
  selectedValue,
  onChangeEventHandler
}: DropdownProps) {
  const optionsHTML = options?.length
    ? options.map((option, index) => {
        return <option key={index} value={option[valueKey]}>{option[textKey]}</option>
      })
    : null

  return (
    <Select
      key={name}
      title={placeholder}
      onChange={onChangeEventHandler}
      value={selectedValue}
      name={name}
      id={id}
      className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5'}
    >
      <option key={`${name}-default`} value={""}>{placeholder}</option>
      {optionsHTML}
    </Select>
  )
}
