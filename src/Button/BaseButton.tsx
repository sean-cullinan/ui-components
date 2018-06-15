import React, { Fragment, PureComponent, ReactNode } from 'react'
import uuid from 'uuid'
import classNames from 'classnames'
import { IBaseButtonProps } from './ButtonHelper'

export class BaseButton extends PureComponent<IBaseButtonProps> {
  public static defaultProps: Partial<IBaseButtonProps> = {
    type: 'neutral',
    iconAlignment: 'left'
  }

  get buttonContent (): ReactNode {
    const {
      id,
      children,
      icon,
      iconAlignment
    } = this.props

    if (icon) {
      const iconComponent = (
        <span
          key={id || uuid.v4()}
          className={classNames('button-icon', iconAlignment)}
        >
          {icon}
        </span>
      )

      if (iconAlignment === 'right') {
        return <Fragment>
          {children}
          {iconComponent}
        </Fragment>
      }

      return <Fragment>
        {iconComponent}
        {children}
      </Fragment>
    }

    return children
  }

  public render (): JSX.Element {
    return this.props.render(this.buttonContent)
  }
}