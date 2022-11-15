import React from 'react'

function ChartView() {
  return (
    <div>
      <iframe style={{
        background: "#FFFFFF",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        width: "100%",
        marginBottom: "10px"
      }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-dbwebthoitrang-tzdzf/embed/charts?id=6363a967-1f60-4c0b-896a-c72ff57d65b8&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
    </div>
  )
}

export default ChartView