import Verify from "@/components/auth/verify"

const VerifyPage = ({ params }: { params: { id: string}}) => {
  return(
    <>
      <Verify _id={params.id}/>
    </>
  )
}
export default VerifyPage