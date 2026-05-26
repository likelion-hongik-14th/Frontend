import { useState } from 'react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Badge from '../components/common/Badge'
import Navbar from '../components/common/Navbar'
import QuantityControl from '../components/common/QuantityControl'
import MenuModal from '../components/restaurant/MenuModal'
import CartList from '../components/cart/CartList'
import PaymentMethodButton from '../components/payment/PaymentMethodButton'
import PaymentBox from '../components/payment/PaymentBox'

const sampleRestaurant = {
  id: 1,
  name: '왕꼬치',
  category: '꼬치',
  rating: 4.6,
  description: '따뜻하게 구운 꼬치 전문점',
  menus: [
    {
      id: 1,
      name: '소고기 꼬치 세트 (5ea)',
      description: '육즙 소고기 꼬치 5개 세트',
      price: '15,000원',
    },
    {
      id: 2,
      name: '닭꼬치 세트 (5ea)',
      description: '간장 닭꼬치 5개 세트',
      price: '12,000원',
    },
    {
      id: 3,
      name: '떡꼬치 (3ea)',
      description: '매콤달콤 떡꼬치',
      price: '5,000원',
    },
  ],
}

function ComponentTest() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState('')

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '소고기 꼬치 세트 (5ea)',
      description: '육즙 소고기 꼬치 5개 세트',
      price: '15,000원',
      count: 1,
    },
    {
      id: 2,
      name: '닭꼬치 세트 (5ea)',
      description: '간장 닭꼬치 5개 세트',
      price: '12,000원',
      count: 2,
    },
  ])

  const handleCartIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    )
  }

  const handleCartDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item,
      ),
    )
  }

  const handleCartRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />

      <main className="px-5 py-10">
        <section className="mx-auto max-w-[900px] rounded-modal bg-gray-0 p-8">
          <h1 className="text-[36px] font-bold text-gray-5">
            공통 컴포넌트 테스트
          </h1>

          <p className="mt-2 text-[20px] font-medium text-gray-3">
            팀원들이 공통 컴포넌트를 한 화면에서 확인할 수 있는 테스트
            페이지입니다.
          </p>

          <div className="mt-8 space-y-12">
            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                Input
              </h2>

              <div className="max-w-[360px] space-y-3">
                <Input placeholder="아이디를 입력하세요" />
                <Input value="yiyoonseo" onChange={() => {}} />
                <Input value="leeyoonseo" onChange={() => {}} error />
                <Input placeholder="비활성화 상태" disabled />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                Button
              </h2>

              <div className="flex flex-wrap gap-3">
                <Button disabled>로그인</Button>
                <Button variant="yellow">로그인</Button>
                <Button>로그인</Button>
                <Button variant="outline">로그인</Button>
                <Button variant="secondary">보조 버튼</Button>
                <Button variant="dark">다크 버튼</Button>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                Badge
              </h2>

              <div className="flex flex-wrap gap-3">
                <Badge>1</Badge>
                <Badge variant="yellow">전체</Badge>
                <Badge variant="gray">카테고리</Badge>
                <Badge variant="assistive">옵션</Badge>
                <Badge variant="dark">BEST</Badge>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                QuantityControl
              </h2>

              <QuantityControl
                count={count}
                onDecrease={() => setCount((prev) => Math.max(1, prev - 1))}
                onIncrease={() => setCount((prev) => prev + 1)}
              />
            </section>

            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                MenuModal
              </h2>

              <Button onClick={() => setIsModalOpen(true)}>
                메뉴 모달 열기
              </Button>
            </section>

            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                Cart
              </h2>

              <CartList
                items={cartItems}
                onIncrease={handleCartIncrease}
                onDecrease={handleCartDecrease}
                onRemove={handleCartRemove}
              />
            </section>

            <section>
              <h2 className="mb-4 text-[24px] font-medium text-gray-5">
                Payment
              </h2>

              <div className="mb-4 flex flex-wrap gap-3">
                <PaymentMethodButton
                  selected={selectedMethod === '카드 결제'}
                  onClick={() => setSelectedMethod('카드 결제')}
                >
                  카드 결제
                </PaymentMethodButton>

                <PaymentMethodButton
                  selected={selectedMethod === '현장 결제'}
                  onClick={() => setSelectedMethod('현장 결제')}
                >
                  현장 결제
                </PaymentMethodButton>
              </div>

              <PaymentBox
                totalPrice="39,000원"
                selectedMethod={selectedMethod}
                onPayment={() => alert('결제 기능은 추후 구현 예정입니다.')}
              />
            </section>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <MenuModal
          restaurant={sampleRestaurant}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ComponentTest