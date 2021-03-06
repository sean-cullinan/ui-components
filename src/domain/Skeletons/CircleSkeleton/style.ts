import styled, { css } from 'styled-components'

import { Props } from '../../../common'
import { styleForSkeletons } from '../style'

export interface ICircleSkeletonWrapperProps {
  size?: Props.AvatarSize
  margins?: Props.IMargins
  display: 'block' | 'inline-block'
}

export const CircleSkeletonWrapper = styled.span`
  border-radius: 50%;
  line-height: 1rem;

  ${(props: ICircleSkeletonWrapperProps) => {
    switch (props.size) {
      case Props.AvatarSize.Small:
        return css`
          height: 30px;
          width: 30px;
        `
      case Props.AvatarSize.Medium:
        return css`
          height: 40px;
          width: 40px;
        `
      case Props.AvatarSize.Large:
        return css`
          height: 72px;
          width: 72px;
        `
      case Props.AvatarSize.XLarge:
        return css`
          height: 120px;
          width: 120px;
        `
    }
  }}

  ${(props: ICircleSkeletonWrapperProps) => styleForSkeletons(props)};
`
