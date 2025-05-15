"use client"

import { useState } from "react"
import type { JailbirdsAttribute } from "@/data/jailbirds-collection"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AttributeFiltersProps {
  attributes: JailbirdsAttribute[]
}

export function AttributeFilters({ attributes }: AttributeFiltersProps) {
  const [expandedAttributes, setExpandedAttributes] = useState<Record<string, boolean>>({})

  const toggleAttribute = (traitType: string) => {
    setExpandedAttributes((prev) => ({
      ...prev,
      [traitType]: !prev[traitType],
    }))
  }

  return (
    <div className="bg-black/40 rounded-lg p-4 border border-amber-500/20">
      <h3 className="font-bold text-lg mb-3 text-white">Filters</h3>

      <div className="space-y-3">
        {attributes.map((attribute) => (
          <div key={attribute.trait_type} className="border-b border-amber-500/10 pb-2 last:border-0 last:pb-0">
            <button
              className="flex items-center justify-between w-full text-left text-amber-100 hover:text-amber-400 transition-colors"
              onClick={() => toggleAttribute(attribute.trait_type)}
            >
              <span className="font-medium">{attribute.trait_type}</span>
              {expandedAttributes[attribute.trait_type] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expandedAttributes[attribute.trait_type] && (
              <div className="mt-2 space-y-1 pl-2">
                {attribute.values.map((value) => (
                  <div key={value} className="flex items-center">
                    <input type="checkbox" id={`${attribute.trait_type}-${value}`} className="mr-2 accent-amber-500" />
                    <label
                      htmlFor={`${attribute.trait_type}-${value}`}
                      className="text-sm text-amber-200/80 hover:text-amber-200 cursor-pointer"
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 rounded-md py-2 text-sm font-medium transition-colors">
        Apply Filters
      </button>
    </div>
  )
}
