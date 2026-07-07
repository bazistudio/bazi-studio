type StatusType = "draft" | "published" | "archived" | "active" | "inactive"

export default function StatusBadge({ status }: { status: StatusType | string }) {
  let bgColor = "bg-gray-500/10"
  let textColor = "text-gray-500"
  let borderColor = "border-gray-500/20"

  switch (status.toLowerCase()) {
    case "published":
    case "active":
      bgColor = "bg-green-500/10"
      textColor = "text-green-500"
      borderColor = "border-green-500/20"
      break
    case "draft":
    case "inactive":
      bgColor = "bg-yellow-500/10"
      textColor = "text-yellow-500"
      borderColor = "border-yellow-500/20"
      break
    case "archived":
      bgColor = "bg-red-500/10"
      textColor = "text-red-500"
      borderColor = "border-red-500/20"
      break
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bgColor} ${textColor} ${borderColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
