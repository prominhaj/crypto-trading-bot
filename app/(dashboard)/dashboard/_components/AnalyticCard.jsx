import { Card, CardContent } from '@/components/ui/card';

const AnalyticCard = ({ label, value }) => {
    return (
        <Card className='rounded-xl bg-muted/50'>
            <CardContent className='pt-5'>
                <h3 className='mb-2 text-lg font-medium'>{label}</h3>
                <p className='text-3xl font-bold text-green-500'>{value}</p>
            </CardContent>
        </Card>
    );
};

export default AnalyticCard;