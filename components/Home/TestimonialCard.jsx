import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialCard({ content, author, position, rating }) {
  return (
    <Card className="p-6 h-full">
      <div className="flex mb-4 justify-center sm:justify-start">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-center sm:text-start text-gray-600 mb-6">{content}</p>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-sm text-gray-500">{position}</div>
        </div>
      </div>
    </Card>
  )
}
