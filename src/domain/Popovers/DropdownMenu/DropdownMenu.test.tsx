import { shallow } from 'enzyme'
import React from 'react'

import { DropdownMenu } from './DropdownMenu'

describe('<DropdownMenu />', () => {
  describe('Simple dropdown behaviour', () => {
    const wrapper = shallow(
      <DropdownMenu
        sections={[
          {
            text: 'Item 1'
          },
          {
            text: 'Item 2',
            href: 'https://www.intellihr.com.au'
          }
        ]}
      />
    )

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should open the menu', () => {
      // @ts-ignore TS2339
      wrapper.instance().openMenu()

      expect(
        wrapper
          .update()
          .find('Popover')
          .prop('isOpen')
      ).toBeTruthy()
    })
  })

  describe('Render a dropdown using custom content', () => {
    const wrapper = shallow(
      <DropdownMenu>
        {() =>
          <>
            I am custom dropdown content!!
          </>
        }
      </DropdownMenu>
    )

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should open the menu', () => {
      // @ts-ignore TS2339
      wrapper.instance().openMenu()

      expect(
        wrapper
          .update()
          .find('Popover')
          .prop('isOpen')
      ).toBeTruthy()
    })
  })
})
