import SurveyCardSkeleton from 'presentation/components/SurveyCard/Skeleton'

export default function SurveyListSkeleton(): JSX.Element {
  return (
    <div title="survey list skeleton">
      {new Array(4).fill(true).map((item, index) => (
        <SurveyCardSkeleton key={index} />
      ))}
    </div>
  )
}
