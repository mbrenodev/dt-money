import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/logo-dt-money.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { ButtonAuth } from '../ButtonAuth'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
        <ButtonAuth />
      </HeaderContent>
    </HeaderContainer>
  )
}
