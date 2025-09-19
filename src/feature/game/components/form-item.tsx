interface FormItemProps {
  label: string
  children: React.ReactNode
}

export function FormItem({ label, children }: FormItemProps) {
  return (
    <div className="mb-4 flex w-full justify-between">
      <label className="mb-2 block text-lg font-bold text-gray-700">{label}</label>
      {children}
    </div>
  )
}
