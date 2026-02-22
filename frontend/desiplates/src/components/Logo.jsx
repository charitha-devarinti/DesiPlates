import {UtensilsCrossed} from 'lucide-react'

const Logo = () => {
    return ( 

        <div className="flex items-center gap2 group cursor-pointer">
           <div className="bg-brand-primary/10 p-2 rounded-x1 group-hover:bg-brand-primary transition-colors duration-300">
                <UtensilsCrossed className='text-brand-primary group-hover:text-white transition-colors' size={28}/>
             </div>
             <h1 className='font-brand text-display font-logo tracking-tight'>
                <span className='text-slate-800'>Desi</span>
                <span className='text-orange-600'>Plates</span>
             </h1>
        </div>

     );
}
 
export default Logo;