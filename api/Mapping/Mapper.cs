using AutoMapper;
using api.Models;
using api.Dtos;

namespace api.Mappings
{
    public class HeroiProfile : Profile
    {
        public HeroiProfile()
        {
            CreateMap<HeroiDto, Herois>()
            .ForMember(dest => dest.HeroisSuperpoderes, opt => opt.Ignore());

            CreateMap<Herois, HeroiDto>();

            CreateMap<Herois, HeroiOutDto>()
            .ForMember(dest => dest.Superpoderes, opt => opt.MapFrom(src => src.HeroisSuperpoderes.Select(hs => hs.Superpoder)));

            CreateMap<Superpoderes, SuperpoderDto>();

            CreateMap<SuperpoderDto, Superpoderes>().ReverseMap();
        }
    }
}