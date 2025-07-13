import {classNames, Div, type DivProps, Title} from "@vkontakte/vkui";
import "./MovieRatingCell.css"

export interface MovieRatingCellProps extends DivProps {
    mode?: 'primary' | 'secondary'
    label: string
    value: number
    maxValue: number
}

export const MovieRatingCell = (props: MovieRatingCellProps) => {
    const {
        mode = "primary",
        label,
        value,
        maxValue,
        className,
        ...rest
    } = props


    const percentage = value / maxValue
    const valueType = percentage >= 0.7 ? 'high' :
        percentage >= 0.5 ? 'medium' :
            percentage > 0 ? 'low' :
                'none'

    return <Div className={classNames("MovieRatingCell", className)} {...rest}>
        <Title className="MovieRatingCell-label" level="3" weight={mode == "primary" ? "2": "3"}>{label}</Title>
        <Title className="MovieRatingCell-value" level="1" data-type={valueType}>
            {Math.floor(value * 10) / 10}
        </Title>
    </Div>
}