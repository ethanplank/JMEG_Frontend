import React from 'react'

export default function Day({day, rowIdx}) {
  return (
    // <div className="border border-gray-200 flex flex-col">
    //   <header className="flex flex-col items-center">
    <div>
      <header>
        {rowIdx === 0 && (
            <p> {day.format("ddd").toUpperCase()}</p>
        )}
        <p>{day.format("DD")}</p>
      </header>
    </div>
  )
}