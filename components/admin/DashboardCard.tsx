import { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
}

export default function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="text-3xl font-bold mt-1 text-foreground">{value}</div>
      {trend && (
        <div className={`text-xs mt-2 font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '+' : ''}{trend.value} from last month
        </div>
      )}
    </div>
  )
}
