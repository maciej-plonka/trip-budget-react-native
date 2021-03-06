import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const  IconPhoto = (props: SvgProps)  => {
    return (
        <Svg viewBox="0 0 512 512" {...props}>
            <Path d="M446.575 0H65.425C29.349 0 0 29.35 0 65.426v381.149C0 482.65 29.349 512 65.425 512h381.15C482.651 512 512 482.65 512 446.574V65.426C512 29.35 482.651 0 446.575 0zm35.267 446.575c0 19.447-15.821 35.267-35.267 35.267H65.425c-19.447 0-35.268-15.821-35.268-35.267v-55.007l99.255-84.451a9.745 9.745 0 0112.562-.075l62.174 51.628c5.995 4.977 14.795 4.569 20.304-.946L372.181 209.77c2.67-2.675 5.783-2.935 7.408-2.852 1.62.083 4.695.661 7.078 3.596l95.176 117.19v118.871zm0-166.71l-71.766-88.366a39.98 39.98 0 00-28.942-14.701c-11.268-.57-22.317 3.672-30.294 11.662L212.832 326.681l-51.59-42.839a39.85 39.85 0 00-51.373.308l-79.712 67.822V65.426c0-19.447 15.821-35.268 35.268-35.268h381.15c19.447 0 35.267 15.821 35.267 35.268v214.439z" />
            <Path d="M161.174 62.995c-40.095 0-72.713 32.62-72.713 72.713 0 40.094 32.619 72.713 72.713 72.713s72.713-32.619 72.713-72.713-32.618-72.713-72.713-72.713zm0 115.269c-23.466 0-42.556-19.091-42.556-42.556 0-23.466 19.09-42.556 42.556-42.556 23.466 0 42.556 19.091 42.556 42.556s-19.09 42.556-42.556 42.556z" />
        </Svg>
    )
}
