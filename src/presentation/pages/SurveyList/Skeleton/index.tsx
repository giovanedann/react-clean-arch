import SurveyCardSkeleton from 'presentation/components/SurveyCard/Skeleton'

export default function SurveyListSkeleton(): JSX.Element {
  return (
    <ul
      title="survey list skeleton"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        columnGap: '2rem'
      }}
    >
      {new Array(6).fill(true).map((item, index) => (
        <SurveyCardSkeleton key={index} />
      ))}
    </ul>
  )
}
