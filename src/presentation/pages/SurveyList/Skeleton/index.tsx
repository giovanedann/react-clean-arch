import SurveyCardSkeleton from 'presentation/components/SurveyCard/Skeleton'

export default function SurveyListSkeleton(): JSX.Element {
  return (
    <>
      {new Array(4).fill(true).map(() => (
        <SurveyCardSkeleton key={crypto.randomUUID()} />
      ))}
    </>
  )
}
