import Button from '../common/Button'

function PaymentBox({
  totalPrice = '0원',
  selectedMethod,
  onPayment,
}) {
  return (
    <section className="rounded-modal bg-gray-0 p-6">
      <h2 className="text-[24px] font-medium text-gray-5">결제 정보</h2>

      <div className="mt-6 flex items-center justify-between border-b border-gray-2 pb-4">
        <span className="text-[20px] font-medium text-gray-4">총 결제 금액</span>
        <strong className="text-[24px] font-bold text-primary">
          {totalPrice}
        </strong>
      </div>

      <div className="mt-4">
        <p className="text-[12px] font-medium text-gray-3">선택한 결제 수단</p>

        <p className="mt-1 text-[20px] font-bold text-gray-5">
          {selectedMethod || '선택 안 됨'}
        </p>
      </div>

      <Button
        size="full"
        className="mt-6"
        disabled={!selectedMethod}
        onClick={onPayment}
      >
        결제하기
      </Button>
    </section>
  )
}

export default PaymentBox