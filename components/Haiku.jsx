"use client"

import { useState } from "react"

export default function Haiku(props) {
  let text = `${props.haiku.line1}%0A${props.haiku.line2}%0A${props.haiku.line3}`

  if (props.preview) {
    text = `Line 1 here%0ALine 2 here%0ALine 3 here`
  }

  return (
    <div className="relative rounded-xl overflow-hidden max-w-[650px]">
      <img src="/aspect-ratio.png" />
      <div className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>

      <img
        className="absolute inset-0"
        src={`https://res.cloudinary.com/${
          process.env.NEXT_PUBLIC_CLOUDNAME
        }/image/upload/b_gen_fill,c_pad,w_650,h_300,g_east/l_one_pixel.jpg,w_250,h_300,e_colorize,co_black,o_50,g_west/l_text:Arial_19_line_spacing_8:${text},co_white,g_west,x_20/${
          props.photo ? props.photo : "fallback"
        }.png`}
      />
    </div>
  )
}
